require 'csv'
require 'json'
require 'securerandom'

## ========== ASTROGATION ========== ##

def seedAstrogationData

  # Read the csv
  planet_data = CSV.parse(File.read('./csv/planets.csv', encoding: 'bom|utf-8'), headers: true)
  astrogation_data = CSV.parse(File.read('./csv/astrogation_data.csv', encoding: 'bom|utf-8'), headers: true)

  # Set up the object
  astrogation = []

  # Loop through the csv
  astrogation_data.each do |astro|
    planetA = astro['fromPlanet']
    planetB = astro['toPlanet']
    planetAFound = false
    planetBFound = false
    planet_data.each do |planet|
      if planet['name'] == planetA
        planetAFound = true
      elsif planet['name'] == planetB
        planetBFound = true
      end
    end

    puts planetA if !planetAFound
    puts planetB if !planetBFound

    astrogation.push({
      from_planet: planetA,
      to_planet: planetB,
      time: astro['baseTime'],
      parsecs: astro['baseParsecs'],
      light_years: astro['baseLightYears'],
      hyperspace_type: astro['hyperspaceType'],
      hyperspace_lane: astro['hyperspaceLane']
    })

    astrogation.push({
      from_planet: planetB,
      to_planet: planetA,
      time: astro['baseTime'],
      parsecs: astro['baseParsecs'],
      light_years: astro['baseLightYears'],
      hyperspace_type: astro['hyperspaceType'],
      hyperspace_lane: astro['hyperspaceLane']
    })
  end

  # Write the data as a javascript object
  astroNav_js_file = File.open('../static/astroNav.js', 'w')
  astroNav_js_file.write("export const astroNav = ")
  astroNav_js_file.write(JSON.pretty_generate(astrogation))
  astroNav_js_file.close

end