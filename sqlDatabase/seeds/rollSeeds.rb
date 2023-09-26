require_relative 'seed_helpers'

require 'csv'

rollsPaxRu = CSV.parse(File.read('Pax-Ru-Rolls.csv', encoding: 'bom|utf-8'), headers: true)

users = {
  zack: 'S2hsgfpJhSfN51uhOjzxkAQe93H2',
  keith: 'vFWV2Q89iAZLomE4clTCVBQJ2vg2'
}
characters = {
  pax: 'mcbzAOXLNjFezLldDYcv',
  ru: 'o0LYx58CwHYugPQxYtSF',
  kell: '5WuGUSOOwA8ZNGn7pZ8q',
  krock: '63D1xNrs7nooGSCVvj3o',
  aleni: 'r7IbAhllRxmdlaKiOQGS',
  torque: 'UixvcE90I4aGyKusVOEz',
  umbo: 't67nj9zWwtzZ2B4GHYhp',
}

row_number = 2
rollsPaxRu.each do |row|
  user = row['user'].downcase.to_sym
  # look up the userID
  user_id = users[user]
  character = row['character'].downcase.to_sym
  # look up the characterID
  character_id = characters[character]
  # if no characterID, use the name instead
  character_id = row['character'] if !character_id

  dice = row['dice'].split('')
  dice_results = row['dice_results'].split(';')
  roll_results = row['roll_results'].scan(/.{1,3}/)
  results = {suc: 0, adv: 0, fai: 0, thr: 0, tri: 0, des: 0, lsp: 0, dsp: 0}

  # if number of dice are not equal to the number of dice results
  # flag the row as bad
  if dice.length != dice_results.length
    puts row_number;
  end

  dice_results.each do |res|
    if !(res === 'nil')
      result = [res]
      if res.length > 3
        result = res.scan(/.{1,3}/)
      end
      result.each do |r|
        results[r.to_sym] += 1
      end
    end

  end

  # compare roll results to cancelled results

  suc = (roll_results.count('suc') - roll_results.count('fai')) === ((results[:suc] + results[:tri]) - (results[:fai] + results[:des]))
  adv = roll_results.count('adv') - roll_results.count('thr') === results[:adv] - results[:thr]
  tri = roll_results.count('tri') === results[:tri]
  des = roll_results.count('des') === results[:des]
  lsp = roll_results.count('lsp') === results[:lsp]
  dsp = roll_results.count('dsp') === results[:dsp]

  if !(suc && adv && tri && des && lsp && dsp)
    puts("suc: #{suc}")
    puts("#{roll_results.count('suc')} - #{roll_results.count('fai')}")
    puts("#{results[:suc]} + #{results[:tri]} - #{results[:fai]} + #{results[:des]}")
    puts("adv: #{adv}")
    puts(roll_results.count('adv'))
    puts("#{results[:adv]} - #{results[:thr]}")
    puts("tri: #{tri}")
    puts("des: #{des}")
    puts("lsp: #{lsp}")
    puts("dsp: #{dsp}")
    puts ("#{row_number}: #{user}: #{character}")
  end

  row_number += 1
end

# connection = PG.connect(
#   dbname: 'your_db_name',
#   user: 'your_db_user',
#   password: 'your_password',
#   host: 'your_db_host'
# )

# data = {
#   user_id: "some_user_id",
#   character_id: "some_char_id",
#   skill: "some_skill",
#   difficulty: "medium"
# }

# seed_table(connection, 'rolls', data)
