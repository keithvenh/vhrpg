require 'csv'
require 'json'
require 'securerandom'

## ========== SKILLS ========== ##

def seedSkills

  skill_data = CSV.parse(File.read('./csv/skills.csv', encoding: 'bom|utf-8'), headers: true)

  skills = {}
  skill_data.each do |skill|
    skill['id'] = skill['id'] || SecureRandom.hex(10)
    skills[skill['id']] = {
      id: skill['id'],
      name: skill['name'],
      characteristic: skill['characteristic'].downcase,
      description: skill['description'],
      category: skill['category'].downcase
    }
  end

  skills_js_file = File.open('../static/skills.js', 'w')
  skills_js_file.write("export const skills =")
  skills_js_file.write(JSON.pretty_generate(skills))
  skills_js_file.close

  CSV.open('./csv/skills.csv', 'w', write_headers: true, headers: skill_data.headers) do |csv|
    skill_data.each do |skill|
      csv << skill
    end
  end
  
end