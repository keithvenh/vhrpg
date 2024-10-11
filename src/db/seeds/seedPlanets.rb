require 'csv'
require 'json'
require 'securerandom'

## ========== PLANETS ========== ##

def seedPlanets

  # Read the csv
  planet_data = CSV.parse(File.read('./csv/planets.csv', encoding: 'bom|utf-8'), headers: true)

  # Set up the object
  planets = {}

  # Loop through the csv
  planet_data.each do |planet|

    # Generate a Random ID or use the given ID
    planet['id'] = planet['id'] || SecureRandom.hex(10)
    # save the planet object
    planets[planet['id']] = {
      id: planet['id'],
      name: planet['name'],
      system: planet['system'],
      sector: planet['sector'],
      region: planet['region'],
      gridSquare: planet['gridSquare']
    }
  end

  # Write the data as a javascript object
  planet_js_file = File.open('../static/planets.js', 'w')
  planet_js_file.write("export const planets = ")
  planet_js_file.write(JSON.pretty_generate(planets))
  planet_js_file.close

  CSV.open('./csv/planets_new.csv', 'w', write_headers: true, headers: %w(id name system sector region gridSquare)) do |csv|
    planets.each do |id, planet|
      csv << planet.values
    end
  end

end