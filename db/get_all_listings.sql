SELECT p.title, p.price, p.location, u.username, u.profile_pic
FROM posts p
JOIN users u ON u.id = p.author;