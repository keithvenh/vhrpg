require 'csv'
require 'json'
require 'securerandom'

## ========== FORCE POWERS ========== ##

# [forcePowers Colection][Static][Offline]
# - id: String
# - name: String
# - book: Map
#   - title: String[book.title]
#   - id: String[book.id]
# - descriptionShort: String[markdown]
# - descriptionLong: String[markdown]
# - cost: Number
# - forceRatingRequired: Number
# - links: Array [Boolean, Boolean, Boolean, Boolean]
# - upgrades: Map [Number]
#   - number: Number
#   - position: Map
#     - row: Number
#     - colStart: Number
#     - colSpan: Number
#   - links: Map
#     - up: Array
#       - Array: Map
#         - colStart: Number
#         - colSpan: Number
#     - down: Boolean
#       - Array: Map
#         - colStart: Number
#         - colSpan: Number
#     - left: Boolean
#     - right: Boolean

def seedForcePowers
  # Read the csv
  force_power_data = CSV.parse(File.read('./csv/force_powers_old.csv', encoding: 'bom|utf-8'), headers: true)
  force_power_upgrades_data = CSV.parse(File.read('./csv/force_power_upgrades_old.csv', encoding: 'bom|utf-8'), headers: true)
  force_power_upgrades_data = force_power_upgrades_data.sort_by { |fp_upgrade| [fp_upgrade['row'].to_i, fp_upgrade['colStart'].to_i] }

  # Set up the object
  force_powers = {}
  
  # Loop through the csv
  force_power_data.each do |force_power|

    # Generate a Random ID or use the given ID
    force_power['id'] = force_power['id'] || SecureRandom.hex(10)

    force_power_upgrades = []
    number = 2  
    upgrades = []
    force_power_upgrades_data.each do |fp_upgrade|
      if fp_upgrade['forcePower'] == force_power['name']

        row = fp_upgrade['row'].to_i
        colStart = fp_upgrade['colStart'].to_i
        colSpan = fp_upgrade['colSpan'].to_i
        colEnd = colStart + colSpan - 1

        # Grab Left and Right Links
        left = fp_upgrade['leftLink'] == "1"
        right = fp_upgrade['rightLink'] == "1"

        # STEP 3: Process up links for row 2
        fp_upgrade['up'] = []
        if row == 2 
          if fp_upgrade["upLink#{colStart}"] == "1" # Check if node links upward
            fp_upgrade['up'] << {colStart:, colSpan:}
          end
        # STEP 4: Process up links for rows 3-5
        elsif row > 2
          if colSpan == 1 # Only one potential upLink
            if fp_upgrade["upLink#{colStart}"] == "1" 
              fp_upgrade['up'] << {colStart:, colSpan:}
            end
          elsif colSpan > 1
            # STEP 5: Handle nodes spanning multiple columns
            col = colStart
            colLinks = []
            while col <= colEnd # Loop through columns current node spans
              colLinks << (fp_upgrade["upLink#{col}"] == "1")
              col += 1
            end
            if colLinks.include?(true)
              prev_upgrades = upgrades.select{|node| node['row'].to_i == row - 1}
              overlap_upgrades = prev_upgrades.select do |node|
                nodeStart = node['colStart'].to_i
                nodeSpan = node['colSpan'].to_i
                nodeEnd = nodeStart + nodeSpan - 1
                (nodeEnd >= colStart && nodeStart <= colEnd)
              end
              overlap_upgrades.each do |overlap|
                overlap_colStart = overlap['colStart'].to_i
                overlap_colSpan = overlap['colSpan'].to_i
                overlap_colEnd = overlap_colStart + overlap_colSpan - 1
                overlap_colStart = [overlap_colStart, colStart].max
                overlap_colEnd = [overlap_colEnd, colEnd].min
                overlap_colSpan = overlap_colEnd - overlap_colStart + 1
                if colLinks[overlap_colStart-colStart]
                  fp_upgrade['up'] << {colStart: overlap_colStart, colSpan: overlap_colSpan}
                end
              end
            end
          end
          # Capture All multi-column upgrades for future looping
        end
        upgrades.push(fp_upgrade)

        up = []
        fp_upgrade['up'].each do |fpu|
          up_arr = []
          fpu.each do |k,v|
            up_arr << "#{k}##>#{v}"
          end
          up << up_arr.join("<-->")
        end
        up = up.join("~~~")
        upgrade = {
          number:,
          name: fp_upgrade['upgrade'],
          position: "row->>#{fp_upgrade['row']}^^^colStart->>#{fp_upgrade['colStart']}^^^colSpan->>#{fp_upgrade['colSpan']}",
          links: "up->>#{up}^^^left->>#{left}^^^right->>#{right}",
          cost: fp_upgrade['cost'],
          descriptionShort: fp_upgrade['descriptionShort']
        }
        upgrade_arr = []
        upgrade.each do |k,v|
          upgrade_arr << "#{k}=>#{v}"
        end
        force_power_upgrades << upgrade_arr.join("_##_")
        number += 1
      end
    end

    
    # save the force power object
    force_powers[force_power['id']] = {
      id: force_power['id'],
      name: force_power['name'],
      forceRatingRequired: force_power['forceRatingRequired'],
      cost: force_power['cost'],
      descriptionShort: force_power['descriptionShort'],
      upgrades: force_power_upgrades.join("|--|")
    }
  end

  # Save the data to the csv
  CSV.open('./csv/force_powers.csv', 'w', write_headers: true, headers: %w(id name forceRatingRequired cost descriptionShort upgrades)) do |csv|
    force_powers.each do |id, force_power|
      csv << force_power.values
    end
  end
end

seedForcePowers