/* eslint-disable no-undef */
import $ from 'jquery';
import qs from 'qs';
import user from '../plugins/user'
import userip from '../plugins/user-ip-info'

import $axios from 'axios';

let token = user.user ? user.user.t : null;
let _ip = userip.ipInfo ? userip.ipInfo.ip : null;
var enableBlockUI = true;

export default {
    setToken(t) {
        token = t;
    },
    setEnableBlockUI(value) {
        enableBlockUI = value;
    },
    setIp() {
        userip.getIpInfo()
        .then(ip => {
            _ip = ip.ip;
        });
    },
    getUrl(url) {
        if (token) {
            if (url.indexOf('?') > 0) {
                url += '&t=' + encodeURIComponent(token);
            } else {
                url += '?t=' + encodeURIComponent(token);
            }
            if (_ip) {
                url += '&ip=' + _ip; 
            } else {
                this.setIp();
                url += '&ip=' + _ip; 
            }  
        } else {
            if (_ip) {
                url += '?ip=' + _ip; 
            } else {
                this.setIp();
                url += '?ip=' + _ip; 
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
                console.log(data);
                if (data.Success) {
                    resolve(data.Result);
                } else {
                    if (data.Status == 6) {
                        window.alert('登入逾時，請重新登入');
                        user.logout();
                        window.location.href = "login.html";
                    }
                    else {
                        reject(res)
                    }               
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
    fetchData(url) {
        return new Promise((resolve, reject) => {
            url.then(res => {
                resolve(res);
            })
            .catch((err) => {
                reject(err)
            })
        });
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
        return this.post('/pfantua/public/backend/api/user', data);
    },

    updateAccount(id, data) {
        return this.put('/pfantua/public/backend/api/user/' + id, data);
    },

    deleteAccount(id) {
        return this.delete('/pfantua/public/backend/api/user/' + id);
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
    deleteBanner(id) {
        return this.delete('/pfantua/public/backend/api/banner/' + id);
    },
    updateBannerStatus(id, data) {
        return this.patch('/pfantua/public/backend/api/bannerStatus/' + id, data);
    },

    getActivityHistories() {
        return this.get('/pfantua/public/backend/api/activities');
    },
    getActivityHistory(id) {
        return this.get('/pfantua/public/backend/api/activity/' + id);
    },
    createActivityHistory(data) {
        return this.post('/pfantua/public/backend/api/activity', data);
    },
    updateActivityHistory(id, data) {
        return this.put('/pfantua/public/backend/api/activity/' + id, data);
    },
    deleteActivityHistory(id) {
        return this.delete('/pfantua/public/backend/api/activity/' + id);
    },
    updateActivityHistoryStatus(id, data) {
        return this.patch('/pfantua/public/backend/api/activityStatus/' + id, data);
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

    getSystemLogs() {
        return this.get('/pfantua/public/backend/api/systemLogs');
    },
    getMemberIpInfo() {
        return this.fetchData($.get('https://ipinfo.io/json'));
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
}