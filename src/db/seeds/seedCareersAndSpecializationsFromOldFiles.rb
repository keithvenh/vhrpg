require 'csv'
require 'json'
require 'securerandom'

## ========== BOOKS ========== ##

def seedCareersAndSpecializations
  # Read the csv
  career_data = CSV.parse(File.read('./csv/careers_old.csv', encoding: 'bom|utf-8'), headers: true)
  specialization_data = CSV.parse(File.read('./csv/specializations_old.csv', encoding: 'bom|utf-8'), headers: true)
  specialization_talents_data = CSV.parse(File.read('./csv/specialization_talents_old.csv', encoding: 'bom|utf-8'), headers: true)
  skill_data = CSV.parse(File.read('./csv/skills.csv', encoding: 'bom|utf-8'), headers: true)
  book_data = CSV.parse(File.read('./csv/books.csv', encoding: 'bom|utf-8'), headers: true)
  talent_data = CSV.parse(File.read('./csv/talents.csv', encoding: 'bom|utf-8'), headers: true)

  # Set up the object
  careers = {}
  specializations = {}

  # Loop through the csv
  career_data.each do |career|

    # Generate a Random ID or use the given ID
    career['id'] = career['id'] || SecureRandom.hex(10)

    # Look up skills
    career_skills = [career['skill1'], career['skill2'], career['skill3'], career['skill4'], career['skill5'], career['skill6'], career['skill7'], career['skill8']]
    career['skills'] = []
    skill_data.each do |skill|
      if career_skills.include?(skill['name'])
        career['skills'].push("#{skill['id']}=>#{skill['name']}")
      end
    end
    
    # Look up book
    book_data.each do |book|
      if career['system'] == book['title'] && book['type'] == "CRB"
        career['book'] = "#{book['id']}=>#{book['title']}=>#{book['subtitle']}"
      end
    end

    # Look up specializations
    career['specializations'] = []
    specialization_data.each do |specialization|
      specialization['id'] = specialization['id'] || SecureRandom.hex(10)
      if specialization['career'] == career['career']
        career['specializations'].push("#{specialization['id']}=>#{specialization['specialization']}")
        specialization['career'] = "#{career['id']}=>#{career['career']}"

        # Look up skills
        specialization_skills = [specialization['skill1'], specialization['skill2'], specialization['skill3'], specialization['skill4'], specialization['skill5'], specialization['skill6']]
        specialization['skills'] = []
        skill_data.each do |skill|
          if specialization_skills.include?(skill['name'])
            specialization['skills'].push("#{skill['id']}=>#{skill['name']}")
          end
        end

        # Look up talents
        specialization['talents'] = []
        specialization_talents_data.each do |spec_talent|
          if spec_talent['specialization'] == specialization['specialization']
            talent_data.each do |talent|
              if talent['name'] == spec_talent['talent']
                t = {
                  id: talent['id'],
                  name: talent['name'],
                  number: (((spec_talent['row'].to_i - 1) * 4) + spec_talent['colStart'].to_i),
                  position: "#{spec_talent['row'].to_i}^^^#{spec_talent['colStart'].to_i}",
                  links: "up->>#{spec_talent['upLink'] == "1"}^^^down->>#{spec_talent['downLink'] == "1"}^^^left->>#{spec_talent['leftLink'] == "1"}^^^right->>#{spec_talent['rightLink'] == "1"}",
                  isActive: talent['isActive'],
                  isForceOnly: talent['isForceOnly'],
                  cost: spec_talent['cost'],
                  description: talent['descriptionShort']
                }
                t_arr = []
                t.each do |k,v|
                  t_arr.push("#{k}=>#{v}")
                end
                specialization['talents'].push(t_arr.join("_##_"))
              end
            end
          end
        end
  
        specializations[specialization['id']] = {
          id: specialization['id'],
          name: specialization['specialization'],
          career: specialization['career'],
          skills: specialization['skills'].join("|--|"),
          specializations: specialization['talents'].join("|--|")
        }
      end

    end
    # save the career object
    careers[career['id']] = {
      id: career['id'],
      name: career['career'],
      book: career['book'],
      skills: career['skills'].join("|--|"),
      specializations: career['specializations'].join("|--|")
    }

  end

  # Save the data to the csv
  CSV.open('./csv/careers.csv', 'w', write_headers: true, headers: %w(id name book skills specializations)) do |csv|
    careers.each do |id, career|
      csv << career.values
    end
  end

  CSV.open('./csv/specializations.csv', 'w', write_headers: true, headers: %w(id name career skills talents)) do |csv|
    specializations.each do |id, spec|
      csv << spec.values
    end
  end
end

seedCareersAndSpecializations