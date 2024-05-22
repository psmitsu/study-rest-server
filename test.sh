#! /usr/bin/bash

# POST new user
echo "Add user Alisa"
curl http://localhost:3000/users/ --json \
'
{
  "name": "Alisa",
  "age": 22
}
'

# POST new user
echo
echo "Add user Boris"
curl http://localhost:3000/users/ --json \
'
{
  "name": "Boris",
  "age": 33
}
'

# GET all users 
echo
echo "Get all users"
curl http://localhost:3000/users/

# GET specific user
echo
echo "Get specific user"
curl http://localhost:3000/users/1

# PUT update user
echo
echo "Update user"
curl http://localhost:3000/users/1 -X PUT --json \
'
{
  "name": "Alyssa",
  "age": 22
}
'

# DELETE user
echo
echo "Delete specific user"
curl http://localhost:3000/users/2 -X DELETE

# GET all users 
echo
echo "Get all users"
curl http://localhost:3000/users/
echo
