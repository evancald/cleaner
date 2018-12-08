SELECT photos.photo_url
FROM photos
JOIN posts on posts.id=photos.postid
WHERE photos.postid=$1;