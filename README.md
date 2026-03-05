
# User-Routes

/api/user
      /login
      /sign-up
      /get-user

# Theater-Routes

/api/theater
         /create
         /update
         /get-theater/:theater_id
         /get-all-theaters
         /delete

# Movie-Routes

/api/movie



{
    "name": "Aashish Chanchalani",
    "email": "Aashish@gmail.com",
    "password":"Aashisht900",
    "phone": "9834933992",
    "role": "vendor",
    "dateOfBirth": "2000-05-18"
}

{
    "name": "Gaurav Kewat",
    "email": "gauravkew121@gmail.com",
    "password":"@@@kewatji@@@@",
    "phone": "6266634065",
    "role": "admin",
    "dateOfBirth": "2000-02-11"
}

give me around 50 to 70 data about the theaters base on the cities which you provided to me these field is shown below and you must ensures that the city_id and owner_id are foreign keys in the Theaters table so put the city_id  from the above cities data city_id and for the owner_id the "id" of users which you provided me which has role only 'user' or 'vendor'   ---

Table: Theaters

Columns:
	theater_id	int AI PK
	name	varchar(255)
	address	varchar(255)
	city_id	int
	owner_id	int
	opening_time	time
	closing_time	time


    select m1.title,
m2.theater_id,
m2.price,
m1.duration_time,
s.screen_type,
s.screen_no,
Date_format( m2.start_time,'%h:%i %p') as start_time,
  Date_format( DATE_ADD(m2.start_time,Interval m1.duration_time minute),'%h:%i %p') as endTime
from Movies m1
join MovieTheaters m2
on m1.movie_id = m2.movie_id
join Screens s 
on m2.screen_id = s.screen_id
