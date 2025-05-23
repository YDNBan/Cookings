#!/usr/bin/env python3
import sys
import json
import datetime
import requests
#from dotenv import load_dotenv
import os

#load_dotenv()

# API credentials and host info
#API_KEY = os.getenv("API_KEY")
API_KEY = 'ba8ff2124amsh4cbad9f1f71bc72p1a1c7ejsn070ceb5ca49e'
if not API_KEY:
    print(json.dumps({"error": "Missing API_KEY in environment variables"}))
    sys.exit(1)

API_HOST = "booking-com15.p.rapidapi.com"
HEADERS = {
    "x-rapidapi-host": API_HOST,
    "x-rapidapi-key": API_KEY
}

def search_destination(query, country_filter=None):
    url = "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination"
    params = {"query": query}
    
    response = requests.get(url, headers=HEADERS, params=params)
    if response.status_code != 200:
        return None, None

    data = response.json()
    print(f"Destination API Response: {response.status_code}", file=sys.stderr)
    
    if isinstance(data, dict) and "data" in data:
        destinations = data["data"]
    elif isinstance(data, list):
        destinations = data
    else:
        destinations = []
    
    if country_filter:
        destinations = [dest for dest in destinations if dest.get("country", "").strip() == country_filter]

    if destinations and len(destinations) > 0:
        destination = destinations[0]
        dest_id = destination.get("dest_id")
        return dest_id, destination
    else:
        return None, None

def search_hotels(dest_id, adults=1, children_age="0,17", room_qty=1, page_number=1,
                units="metric", temperature_unit="c", languagecode="en-us",
                currency_code="AED", location="US", search_type="CITY",
                arrival_date=None, departure_date=None):
    if arrival_date is None or departure_date is None:
        today = datetime.date.today()
        tomorrow = today + datetime.timedelta(days=1)
        arrival_date = today.strftime('%Y-%m-%d')
        departure_date = tomorrow.strftime('%Y-%m-%d')
    
    url = "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels"
    params = {
        "dest_id": dest_id,
        "search_type": search_type,
        "adults": adults,
        "children_age": children_age,
        "room_qty": room_qty,
        "page_number": page_number,
        "units": units,
        "temperature_unit": temperature_unit,
        "languagecode": languagecode,
        "currency_code": currency_code,
        "location": location,
        "arrival_date": arrival_date,
        "departure_date": departure_date
    }
    
    response = requests.get(url, headers=HEADERS, params=params)
    if response.status_code != 200:
        return None
    
    hotels_data = response.json()
    hotels = []
    if isinstance(hotels_data, dict) and "data" in hotels_data:
        data_section = hotels_data["data"]
        if isinstance(data_section, dict) and "hotels" in data_section:
            hotels = data_section["hotels"]
        else:
            hotels = data_section
    else:
        hotels = hotels_data
    
    return hotels

def main():
    # Expect JSON string as first command-line argument
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No input provided"}))
        sys.exit(1)
    try:
        input_data = json.loads(sys.argv[1])
    except Exception as e:
        print(json.dumps({"error": f"Invalid input JSON: {str(e)}"}))
        sys.exit(1)
    
    query = input_data.get("query")
    country_filter = input_data.get("country_filter")
    
    dest_id, destination_info = search_destination(query, country_filter)
    if not dest_id:
        print(json.dumps({"error": "No destination found"}))
        sys.exit(1)
    
    hotels = search_hotels(dest_id)
    result = {
        "dest_id": dest_id,
        "destination_info": destination_info,
        "hotels": hotels
    }
    # Output the result to stdout in JSON format
    print(json.dumps(result))

if __name__ == "__main__":
    main()