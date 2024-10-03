require 'csv'
require 'json'
require 'securerandom'

## ========== BOOKS ========== ##

def seedSpecializations
  # Read the csv
  specialization_data = CSV.parse(File.read('./csv/specializations.csv', encoding: 'bom|utf-8'), headers: true)

  # Set up the object
  specializations = {}

  # Loop through the csv
  specialization_data.each do |specialization|
    # Generate a Random ID or use the given ID
    specialization['id'] = specialization['id'] || SecureRandom.hex(10)

    career = specialization['career'].split("=>")
    career = {id: career[0], name: career[1]}

    skills = specialization['skills'].split('|--|')
    skills = skills.map do |skill|
      skill = skill.split("=>")
      {id: skill[0], name: skill[1]}
    end

    talents = specialization['talents'].split('|--|') # Creates an array of talent strings
    talents = talents.map do |talent|
      talent = talent.split("_##_") # Creates an array of talent key=>value strings
      talent = talent.map do |tal|
        tal = tal.split("=>") # Creates an array [key, value]
        {"#{tal[0]}": tal[1]} # Replaces the array with an object {key: value}
      end
      talent = talent.reduce({}, :merge)
      talent[:position] = talent[:position].split("^^^")
      talent[:links] = talent[:links].split("^^^").map do |talent_link|
        talent_link = talent_link.split("->>")
        {"#{talent_link[0]}": talent_link[1]}
      end.reduce({}, :merge)
      
      talent
    end

    # save the specialization object
    specializations[specialization['id']] = {
      id: specialization['id'],
      name: specialization['name'],
      career:,
      skills:,
      talents:
    }

  end

  # Write the data as a javascript object
  specialization_js_file = File.open('../static/specializations.js', 'w')
  specialization_js_file.write("export const specializations = ")
  specialization_js_file.write(JSON.pretty_generate(specializations))
  specialization_js_file.close

end