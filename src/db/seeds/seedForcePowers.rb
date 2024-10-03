require 'csv'
require 'json'
require 'securerandom'

## ========== BOOKS ========== ##

def seedForcePowers
  # Read the csv
  force_power_data = CSV.parse(File.read('./csv/force_powers.csv', encoding: 'bom|utf-8'), headers: true)

  # Set up the object
  force_powers = {}

  # Loop through the csv
  force_power_data.each do |force_power|
    # Generate a Random ID or use the given ID
    force_power['id'] = force_power['id'] || SecureRandom.hex(10)

    upgrades = force_power['upgrades'].split("|--|") # Creates an array of upgrade strings

    upgrades = upgrades.map do |upgrade|
      upgrade = upgrade.split("_##_") # Creates and array of upgrade key=>value strings
      upgrade = upgrade.map do |upgr|
        upgr = upgr.split("=>") # Creates an array [key, value]
        {"#{upgr[0]}": upgr[1]} # Replaces key=>value string with object {key: value}
      end
      upgrade = upgrade.reduce({}, :merge) # Combines the array of {key: value} objects into one object

      upgrade[:position] = upgrade[:position].split("^^^") # Creates an array of key->>value strings
      upgrade[:position] = upgrade[:position].map do |pos|
        pos = pos.split("->>") # Creates an array [key, value]
        {"#{pos[0]}": pos[1]} # Replaces key->> value string with object {key: value}
      end
      upgrade[:position] = upgrade[:position].reduce({}, :merge) # Combines the array of {key: value} objects into one object

      upgrade[:links] = upgrade[:links].split("^^^") # Creates an array of key->>value strings
      upgrade[:links] = upgrade[:links].map do |link|
        link = link.split("->>") # Creates an array [key, value]
        {"#{link[0]}": link[1]} # Replaces key->>value string with object key: value
      end
      upgrade[:links] = upgrade[:links].reduce({}, :merge) # Combines the array of {key: value} objects into one object

      if upgrade[:links][:up]
        upgrade[:links][:up] = upgrade[:links][:up].split("~~~") # Creates an array of key##>value<-->key##>value
        upgrade[:links][:up] = upgrade[:links][:up].map do |uplink|
          uplink = uplink.split("<-->") #Creates an array of arrays of key##>value
          uplink = uplink.map do |ul|
            ul = ul.split("##>") # creates an array of arrays of [key, value]
            {"#{ul[0]}": ul[1]} # Replaces array of arrays of strings with array of arrays of objects {key: value}
          end
          uplink.reduce({}, :merge) # Replaces an array of arrays of objects with array of objects
        end
      end
      upgrade
    end

    # save the specialization object
    force_powers[force_power['id']] = {
      id: force_power['id'],
      name: force_power['name'],
      forceRatingRequired: force_power['forceRatingRequired'],
      cost: force_power['cost'],
      descriptionShort: force_power['descriptionShort'],
      upgrades:
    }

  end

  # Write the data as a javascript object
  specialization_js_file = File.open('../static/forcePowers.js', 'w')
  specialization_js_file.write("export const forcePowers = ")
  specialization_js_file.write(JSON.pretty_generate(force_powers))
  specialization_js_file.close

end