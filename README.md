# Videos
Video and user watchlater video project

create separate controller, entities and services for users , videos and watchlater.
create service for cronjob to  store youtube videos in video collection
impleted authentication with jwt for user to add ,delete videos in watchlater list.


users endpoint--
{/users/register, POST} route +5ms
{/users/login, POST} 
{/users/logout, POST}

videos endpoints---
{/videos, GET} -- get all videos with pagination
{/videos/id, GET} -- get video with id
{/videos/search, GET} --  get video search with title

Watch-later endpoints---
{/watch-later/:videoId, POST} -- add video to watchlater table
{/watch-later, POST} -- get watch later videos
{/watch-later/:videoId, DELETE} -- delete from watch later table.
