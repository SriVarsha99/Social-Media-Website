import mysql from "mysql2"
export const db=mysql.createConnection({
    host:'localhost',
    //user: 'simran',
    user:'root',
    password:'Pwd123',
    database:'project_social_media'
  })