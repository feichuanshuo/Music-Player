import axios from "./myAxios"

export const requestMusic = (songName,singerName='') => axios.get(`https://zj.v.api.aa1.cn/api/qqmusic/?songName=${songName}&singerName=${singerName}&playlistId=211111&pageNum=1&pageSize=40&type=qq`)
