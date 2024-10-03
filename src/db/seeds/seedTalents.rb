require 'csv'
require 'json'
require 'securerandom'

## ========== BOOKS ========== ##

def seedTalents

  # Read the csv
  talent_data = CSV.parse(File.read('./csv/talents.csv', encoding: 'bom|utf-8'), headers: true)

  # Set up the object
  talents = {}

  # Loop through the csv
  talent_data.each do |talent|
    # Generate a Random ID or use the given ID
    talent['id'] = talent['id'] || SecureRandom.hex(10)

    # save the talent object
    talents[talent['id']] = {
      id: talent['id'],
      name: talent['talent'],
      isActive: talent['isActive'],
      activationType: talent['activation'],
      isForceOnly: talent['isForceOnly'],
      isRanked: talent['isRanked'],
      descriptionShort: talent['descriptionShort'],
      descriptionLong: talent['descriptionLong']
    }
  end

  # Write the data as a javascript object
  talent_js_file = File.open('../static/talents.js', 'w')
  talent_js_file.write("export const talents = ")
  talent_js_file.write(JSON.pretty_generate(talents))
  talent_js_file.close

  # Save the data to the csv
  CSV.open('./csv/talents_new.csv', 'w', write_headers: true, headers: talent_data.headers) do |csv|
    talent_data.each do |talent|
      csv << talent
    end
  end

end