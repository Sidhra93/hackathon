
require 'sinatra'
require 'sinatra/reloader'
require 'httparty'
require 'pry'

get '/' do
  @search_carspots = HTTParty.get("https://data.melbourne.vic.gov.au/resource/dtpv-d4pf.json").parsed_response
  @search_carspots.delete_if{|carspot| carspot["status"] == "Present"}
  # binding.pry

  erb :index
end
