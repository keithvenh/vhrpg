require 'csv'
require 'json'
require 'securerandom'

## ========== BOOKS ========== ##

def seedBooks

  # Read the csv
  book_data = CSV.parse(File.read('./csv/books.csv', encoding: 'bom|utf-8'), headers: true)

  # Set up the object
  books = {}

  # Loop through the csv
  book_data.each do |book|

    # Generate a Random ID or use the given ID
    book['id'] = book['id'] || SecureRandom.hex(10)
    # save the book object
    books[book['id']] = {
      id: book['id'],
      system: book['system'],
      title: book['title'],
      subtitle: book['subtitle'],
      type: book['type'].downcase
    }
  end

  # Write the data as a javascript object
  book_js_file = File.open('../static/books.js', 'w')
  book_js_file.write("export const books = ")
  book_js_file.write(JSON.pretty_generate(books))
  book_js_file.close

end