Timezone::Lookup.config(:google) do |c|
  c.api_key = ENV['GOOGLE_API_KEY']
  # c.client_id = 'your_google_client_id' # if using 'Google for Work'
end