SELECT p.id, p.type, p.title, p.description, p.price, p.worker, p.address, p.city, p.usstate, p.zip, u.username, u.profile_pic
FROM posts p
JOIN users u ON u.userid=p.author
WHERE p.id=$1;