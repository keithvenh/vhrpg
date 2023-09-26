require 'pg'

def seed_table(connection, table, obj)
  return if obj.empty? # Do nothing if object is empty

  columns = obj.keys.join(", ")
  
  placeholders = obj.keys.map.with_index(1) { |_, idx| "$#{idx}" }.join(", ")

  values = obj.values

  query = "INSERT INTO #{table} (#{columns}) VALUES (#{placeholders})"
  
  connection.exec_params(query, values)
end
