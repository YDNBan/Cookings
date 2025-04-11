import requests
import datetime

# API credentials and host info
API_KEY = "69150d8f56msh7db24ce8d7bf7b0p1e6bd6jsn10374c36c8b6"
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
        print("Error during destination search:", response.status_code, response.text)
        return None, None

    data = response.json()
    
    # Extract destinations from the "data" key if present.
    if isinstance(data, dict) and "data" in data:
        destinations = data["data"]
    elif isinstance(data, list):
        destinations = data
    else:
        destinations = []

    if country_filter:
        destinations = [dest for dest in destinations if dest.get("country", "").strip() == country_filter]

    if destinations and isinstance(destinations, list) and len(destinations) > 0:
        destination = destinations[0]
        dest_id = destination.get("dest_id")
        return dest_id, destination
    else:
        print("No destinations found for query:", query)
        return None, None

def search_hotels(dest_id, adults=1, children_age="0,17", room_qty=1, page_number=1,
    units="metric", temperature_unit="c", languagecode="en-us",
    currency_code="AED", location="US", search_type="CITY",
    arrival_date=None, departure_date=None):
    # Set default arrival and departure dates if not provided:
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
        print("Error during hotel search:", response.status_code, response.text)
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
    user_input = input("Enter a city search query (e.g., 'man' or 'man, United States of America'): ").strip()
    
    country_filter = None
    if ", United States of America" in user_input:
        user_input = user_input.replace(", United States of America", "").strip()
        country_filter = "United States of America"
    
    dest_id, destination_info = search_destination(user_input, country_filter)
    if dest_id:
        print("\nFound Destination:")
        print(f"Name: {destination_info.get('name', 'N/A')}")
        print(f"Country: {destination_info.get('country', 'N/A')}")
        print(f"Destination ID: {dest_id}\n")
        
        hotels = search_hotels(dest_id)
        if hotels:
            print("Hotels in the selected destination:")
            for hotel in hotels:
                if isinstance(hotel, dict):
                    # Extract hotel details from the 'property' dictionary if available.
                    property_info = hotel.get("property", {})
                    hotel_name = property_info.get("name", "N/A")
                    review_score = property_info.get("reviewScore", "N/A")
                    # You might add more fields as needed.
                    print(f"Hotel Name: {hotel_name}")
                    print(f"Review Score: {review_score}")
                else:
                    print("Hotel info:", hotel)
                print("-" * 40)
        else:
            print("No hotels found for this destination.")
    else:
        print("No valid destination was found.")

if __name__ == "__main__":
    main()
