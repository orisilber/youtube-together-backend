# watch-together-backend

### How to run
to setup redis run `docker-compose up -d` 
To run server run `yarn` and then `yarn start`

### Scale notes
The playlist data is currently stored in a redis list.
This allows us to add multiple playlists and rooms but may cause problems when a list grows too long.
Our compexity currently is:
- Get all: `O(n)`
- Add: `O(1)`
- Remove: `O(n)`
- Move (if we were to implement it): `O(n+m)` where `n` is the list and `m` is the remaining sublist

If we would need the list to grow than a better solution would be to:
Store in redis an index as the key and the video data as the value.
- we can use SCAN command to get our data in chunks: `O(n)`
- Add: `O(1)` by storing the last index
- Remove: `O(1)`
- Move: `O(1)` by replacing the two entries' keys

In the first scale option we would need to use mutex on move function only.
In the second scale option we would need to use mutex on all write functions (add/remove/move).

We can also improve the read all by caching the response.
