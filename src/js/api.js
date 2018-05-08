import axios from 'axios'

// api 路径
// const HOST = 'http://news-at.zhihu.com/api'

const API_V4 = '/api/4';
const API_V3 = '/api/3';

const API_NEWS = API_V4 + '/news';
const API_STORY = API_V4 + '/story';

export function fetch(url, method = 'GET') {
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            //params:params
        })
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

export default {

    /**
     * 获取最新日报
     * @returns {string}
     */
    getLatestNews() {
        return fetch(API_NEWS + '/latest')
    },

    /**
     * 获取日报详情
     * @param {int} newsId 日报id
     * @returns {string}
     */
    getNewsDetail(newsId) {
        return fetch(API_NEWS + '/' + newsId)
    },

    /**
     * 获取以往日报 
     * 知乎日报最早20130519
     * @param {string} date 日期 yyyMMdd
     * @returns {string}
     */
    getBeforeNews(date) {
        return fetch(API_NEWS + '/before/' + date)
    },

    /**
     * 获取新闻额外的评论数量和点赞数量等信息
     * @param {int} newsId 日报id
     * @returns {string}
     */
    getStoryExtraInfo(storyId) {
        return fetch(API_STORY + '-extra/' + storyId)
    },

    /**
     * 获取新闻对应长评
     * @param {int} storyId 新闻idid
     * @returns {string}
     */
    getStoryLongComments(storyId) {
        return fetch(API_STORY + '/' + storyId + '/long-comments')
    },


    /**
     * 新闻对应短评论查看
     * @param {int} storyId 新闻idid
     * @returns {string}
     */

    getTheme() {
        return fetch(API_V4 + '/themes')
    },

    getThemeStories(themeId) {
        return fetch(API_V4 + '/theme/' + themeId)
    },

    getStoryShortComments(storyId) {
        return fetch(API_STORY + '/' + storyId + '/short-comments')
    },

    /**
     * 获取启动界面封面
     * @param {string} size 图片尺寸 格式：width*height
     * @return {string}
     */
    getSplashCover(size) {
        return fetch(API_V4 + "/start-image/" + size)
    },

}