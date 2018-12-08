SELECT p.title, p.price, p.city, p.id, p.default_photo, u.username, u.profile_pic, u.userid
FROM posts p
JOIN users u ON u.userid = p.author;