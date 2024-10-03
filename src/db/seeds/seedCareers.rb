require 'csv'
require 'json'
require 'securerandom'

## ========== BOOKS ========== ##

def seedCareers

  # Read the csv
  career_data = CSV.parse(File.read('./csv/careers.csv', encoding: 'bom|utf-8'), headers: true)

  # Set up the object
  careers = {}

  # Loop through the csv
  career_data.each do |career|
    # Generate a Random ID or use the given ID
    career['id'] = career['id'] || SecureRandom.hex(10)

    book = career['book'].split("=>")
    book = {id: book[0], title: book[1], subtitle: book[2]}

    skills = career['skills'].split('|--|')
    skills = skills.map do |skill|
      skill = skill.split("=>")
      {id: skill[0], name: skill[1]}
    end

    specializations = career['specializations'].split('|--|')
    specializations = specializations.map do |spec|
      spec = spec.split("=>")
      {id: spec[0], name: spec[1]}
    end

    # save the career object
    careers[career['id']] = {
      id: career['id'],
      name: career['name'],
      book:,
      skills:,
      specializations:
    }
  end

  # Write the data as a javascript object
  career_js_file = File.open('../static/careers.js', 'w')
  career_js_file.write("export const careers = ")
  career_js_file.write(JSON.pretty_generate(careers))
  career_js_file.close

end