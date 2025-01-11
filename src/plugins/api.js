/* eslint-disable no-undef */
import $ from 'jquery';
import qs from 'qs';
import user from '../plugins/user'

import $axios from 'axios';

let token = user.user ? user.user.t : null;
var enableBlockUI = true;

export default {
    setToken(t) {
        token = t;
    },
    setEnableBlockUI(value) {
        enableBlockUI = value;
    },
    getUrl(url) {
        if (token) {
            if (url.indexOf('?') > 0) {
                url += '&t=' + encodeURIComponent(token);
            } else {
                url += '?t=' + encodeURIComponent(token);
            }
        }
        return config.host + url;
    },

    handle(p) {
        return new Promise((resolve, reject) => {
            if (enableBlockUI && window.blockUI) {
                window.blockUI();
            }
            p.then(res => {
                var data = res.data;
                if (data.Success) {
                    resolve(data.Result);
                } else {
                    reject(res)
                }
                window.unblockUI();
            })
            .catch((err) => {
                console.log(err);
                window.unblockUI();
                reject(err)
            });
        });
    },

    downloadFile(fileName, content) {
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(content, fileName);
        } else {
            var aLink = document.createElement('a');
            var blob = new Blob([content], { type: 'text/csv' });
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
            aLink.download = fileName;
            aLink.href = URL.createObjectURL(blob);
            aLink.dispatchEvent(evt); 
            aLink.id = "alink";
            aLink.click(); 
        }
    },


    async getCsv(endpoint) {
        const { data } = await $axios.get(this.getUrl(endpoint));
        return data;
    },

    get(url, data) {
        if (!data) {
            return this.handle($axios.get(this.getUrl(url)));
        } else {
            return this.handle($axios.get(this.getUrl(url) + qs.stringify(url)));
        }
    },
    post(url, data, config) {
        return this.handle($axios.post(this.getUrl(url), data, config));
    },
    multipartPost(url, data) {
        url = this.getUrl(url);
        var fdata = new FormData();
        for (var key in data) {
            fdata.append(key, data[key]);
        }
        return $.ajax({
            type: "POST",
            url: url,
            contentType: false,
            processData: false,
            data: fdata
        });
    },
    put(url, data) {
        return this.handle($axios.put(this.getUrl(url), data));
    },
    patch(url, data) {
        return this.handle($axios.patch(this.getUrl(url), data));
    },
    putStatus(url) {
        return this.handle($axios.post(this.getUrl(url)));
    },
    delete(url) {
        return this.handle($axios.delete(this.getUrl(url)));
    },
    hasToken() {
        return token != null && token != undefined && token != "";
    },

    getAccounts() {
        return this.get('/pfantua/public/backend/api/users');
    },

    getAccount(id) {
        return this.get('/pfantua/public/backend/api/user/' + id);
    },

    createAccount(data) {
        return this.post('/api/backend/CreateAccount', data);
    },

    updateAccount(id, data) {
        return this.put('/api/backend/UpdateAccount/' + id, data);
    },

    deleteAccount(id) {
        return this.delete('/api/backend/DeleteAccount/' + id);
    },

    getBanners() {
        return this.get('/pfantua/public/backend/api/banners');
    },
    getBanner(id) {
        return this.get('/pfantua/public/backend/api/banner/' + id);
    },
    createBanner(data) {
        return this.post('/pfantua/public/backend/api/banner', data);
    },
    updateBanner(id, data) {
        return this.put('/pfantua/public/backend/api/banner/' + id, data);
    },
    delBanner(id) {
        return this.del('/pfantua/public/backend/api/banner/' + id);
    },
    updateBannerStatus(id, data) {
        return this.patch('/pfantua/public/backend/api/bannerStatus/' + id, data);
    },

    getRoles() {
        return this.get('/pfantua/public/backend/api/roles');
    },
    getRole(id) {
        return this.get('/pfantua/public/backend/api/role/' + id);
    },
    createRole(data) {
        return this.post('/pfantua/public/backend/api/role', data, config);
    },
    updateRole(id, data) {
        return this.put('/pfantua/public/backend/api/role/' + id, data, config);
    },
    deleteRole(id) {
        return this.delete('/pfantua/public/backend/api/role/' + id);
    },

    getNewsCategories() {
        return this.get('/pfantua/public/backend/api/newsCategories');
    },
    getNewsList() {
        return this.get('/pfantua/public/backend/api/newsList');
    },
    getNews(id) {
        return this.get('/pfantua/public/backend/api/news/' + id);
    },
    createNews(data) {
        return this.post('/pfantua/public/backend/api/news', data, config);
    },
    updateNews(id, data) {
        return this.put('/pfantua/public/backend/api/news/' + id, data, config);
    },
    deleteNews(id) {
        return this.delete('/pfantua/public/backend/api/news/' + id);
    },
    updateNewsStatus(id, data) {
        return this.patch('/pfantua/public/backend/api/newsStatus/' + id, data);
    },

    getCollageDepartments() {
        return this.get('/pfantua/public/backend/api/collageDepartments');
    },
    getCollageDepartment(id) {
        return this.get('/pfantua/public/backend/api/collageDepartment/' + id);
    },
    createCollageDepartment(data) {
        return this.post('/pfantua/public/backend/api/collageDepartment', data, config);
    },
    updateCollageDepartment(id, data) {
        return this.put('/pfantua/public/backend/api/collageDepartment/' + id, data, config);
    },
    deleteCollageDepartment(id) {
        return this.delete('/pfantua/public/backend/api/collageDepartment/' + id);
    },
    updateCollageDepartmentStatus(id, data) {
        return this.patch('/pfantua/public/backend/api/collageDepartmentStatus/' + id, data);
    },

    getCollageColleagues() {
        return this.get('/pfantua/public/backend/api/collageColleagues');
    },
    getCollageColleague(id) {
        return this.get('/pfantua/public/backend/api/collageColleague/' + id);
    },
    createCollageColleague(data) {
        return this.post('/pfantua/public/backend/api/collageColleague', data, config);
    },
    updateCollageColleague(id, data) {
        return this.put('/pfantua/public/backend/api/collageColleague/' + id, data, config);
    },
    deleteCollageColleague(id) {
        return this.delete('/pfantua/public/backend/api/collageColleague/' + id);
    },
    updateCollageColleagueStatus(id, data) {
        return this.patch('/pfantua/public/backend/api/collageColleagueStatus/' + id, data);
    },

    getCollageInfo() {
        return this.get('/pfantua/public/backend/api/collageInfo');
    },
    updateCollageInfo(id, data) {
        return this.put('/pfantua/public/backend/api/collageInfo/'+ id, data);
    },

    getRelatedResourceCategories() {
        return this.get('/pfantua/public/backend/api/relatedResourceCategories');
    },
    getRelatedResources() {
        return this.get('/pfantua/public/backend/api/relatedResources');
    },
    getRelatedResource(id, data) {
        return this.get('/pfantua/public/backend/api/relatedResource/'+ id, data);
    },
    createRelatedResource(data) {
        return this.post('/pfantua/public/backend/api/relatedResource', data);
    },
    updateRelatedResource(id, data) {
        return this.put('/pfantua/public/backend/api/relatedResource/'+ id, data);
    },
    deleteRelatedResource(id) {
        return this.delete('/pfantua/public/backend/api/relatedResource/'+ id);
    },
    updateRelatedResourceStatus(id, data) {
        return this.patch('/pfantua/public/backend/api/relatedResourceStatus/' + id, data);
    },

    getRegulations() {
        return this.get('/pfantua/public/backend/api/regulations');
    },
    getRegulation(id, data) {
        return this.get('/pfantua/public/backend/api/regulation/'+ id, data);
    },
    createRegulation(data) {
        return this.post('/pfantua/public/backend/api/regulation', data);
    },
    updateRegulation(id, data) {
        return this.put('/pfantua/public/backend/api/regulation/'+ id, data);
    },
    deleteRegulation(id) {
        return this.delete('/pfantua/public/backend/api/regulation/'+ id);
    },
    updateRegulationStatus(id, data) {
        return this.patch('/pfantua/public/backend/api/regulationStatus/' + id, data);
    },

    getCollageHeadElections() {
        return this.get('/pfantua/public/backend/api/collageHeadElections');
    },
    getCollageHeadElection(id, data) {
        return this.get('/pfantua/public/backend/api/collageHeadElection/'+ id, data);
    },
    createCollageHeadElection(data) {
        return this.post('/pfantua/public/backend/api/collageHeadElection', data);
    },
    updateCollageHeadElection(id, data) {
        return this.put('/pfantua/public/backend/api/collageHeadElection/'+ id, data);
    },
    deleteCollageHeadElection(id) {
        return this.delete('/pfantua/public/backend/api/collageHeadElection/'+ id);
    },
    updateCollageHeadElectionStatus(id, data) {
        return this.patch('/pfantua/public/backend/api/collageHeadElectionStatus/' + id, data);
    },

    getCollageCourses() {
        return this.get('/pfantua/public/backend/api/collageCourses');
    },
    getCollageCourse(id) {
        return this.get('/pfantua/public/backend/api/collageCourse/' + id);
    },
    createCollageCourse(data) {
        return this.post('/pfantua/public/backend/api/collageCourse', data, config);
    },
    updateCollageCourse(id, data) {
        return this.put('/pfantua/public/backend/api/collageCourse/' + id, data, config);
    },
    deleteCollageCourse(id) {
        return this.delete('/pfantua/public/backend/api/collageCourse/' + id);
    },
    updateCollageCourseStatus(id, data) {
        return this.patch('/pfantua/public/backend/api/collageCourseStatus/' + id, data);
    },

    getCancelToken() {
        return $axios.CancelToken.source();
    },
    upload(url, file, cancel, uploadProgressCallback) {
        var data = new FormData();
        data.append('userfile', file);
        var token = null;
        if (cancel) {
            token = cancel.token;
        }
        return this.post(url, data, {
            cancelToken: token,
            onUploadProgress(evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    if (uploadProgressCallback) {
                        uploadProgressCallback((percentComplete * 100.0).toFixed(2));
                    }
                }
            }
        });
    },
    getLessonCategories() {
        return this.get('/api/backend/GetLessonCategories');
    },
    getLessons() {
        return this.get('/api/backend/GetLessons');
    },
    getLesson(id) {
        return this.get('/api/backend/GetLesson/' + id);
    },
    addLesson(data) {
        return this.post('/api/backend/CreateLesson', data);
    },
    updateLesson(data) {
        return this.post('/api/backend/UpdateLesson', data);
    },
    deleteLesson(id) {
        return this.delete('/api/backend/DeleteLesson/' + id);
    },
    updateLessonPublishStatus(id) {
        return this.putStatus('/api/backend/UpdateLessonPublishStatus/' + id);
    },
    updateBannerSort(data) {
        return this.post('/api/backend/UpdateBannerSort', data);
    },
    getCss() {
        return this.get('/api/backend/GetCss');
    },
    updateCss(data) {
        return this.post('/api/backend/UpdateCss', data);
    },
    getSetting(){
        return this.get('/api/backend/GetSetting');
    },
    updateSetting(data) {
        return this.post('/api/backend/UpdateSetting', data);
    },
    getMembers(){
        return this.get('/api/backend/GetMembers');
    },
    getMember(id) {
        return this.get('/api/backend/GetMember/' + id);
    },
    updateMember(data) {
        return this.post('/api/backend/UpdateMember', data);
    },
    updateMemberPassword(data) {
        return this.post('/api/backend/UpdateMemberPassword', data);
    },
    getLessonStatistics(startDate, endDate) {
        return this.get('/api/backend/GetLessonStatisticList?' + 'startDate=' + startDate + '&endDate=' + endDate);
    },
    getTeachPlanStatistics(startDate, endDate) {
        return this.get('/api/backend/GetTeachPlanStatisticList?' + 'startDate=' + startDate + '&endDate=' + endDate);
    },
    getMemberLessonStatistics(startDate, endDate, sortBy) {
        return this.get('/api/backend/GetMemberLessonStatisticList?' + 'startDate=' + startDate + '&endDate=' + endDate+ '&sortBy=' + sortBy);
    },
    getMemberLessonStatisticsRanking(startDate, endDate, sortBy) {
        return this.get('/api/backend/GetMemberLessonRankingList?' + 'startDate=' + startDate + '&endDate=' + endDate+ '&sortBy=' + sortBy);
    },
    getMemberTeachPlanStatistics(startDate, endDate) {
        return this.get('/api/backend/GetMemberTeachPlanStatisticList?' + 'startDate=' + startDate + '&endDate=' + endDate);
    },
    getMemberRegisterStatistics(startDate, endDate, dateType) {
        return this.get('/api/backend/GetMemberRegisterStatisticList?' + 'startDate=' + startDate + '&endDate=' + endDate + '&dateType=' + dateType);
    },
    getMemberRegisterCounts(startDate, endDate, dateType) {
        return this.get('/api/backend/GetMemberRegisterTotalCountsByDate?' + 'startDate=' + startDate + '&endDate=' + endDate + '&dateType=' + dateType);
    }
}