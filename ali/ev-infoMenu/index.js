<<<<<<< HEAD
=======
import fmtEvent from "../_util/fmtEvent";
import cloud from "@tbmp/mp-cloud-sdk";
import dayjs from "dayjs";
import {qnSubscribeDeadLineQuery} from "../../../hooks/cloudFunc";

>>>>>>> 4c339861f7059db9b4b27ef2db56168638141ba6
Component({
    mixins: [],
    data: {
        itemSelect: 0,
        visible: false,
        visible2: false,
        visibleFlexd: false,
        dueToTime: '1970.01.01 00:00'
    },
    props: {
        appName: '庚辛小程序',
        location: '',
        titleName: '首页',
        onSelect: null,
        routes: null,
        dueTo: false,
        serviceUrl: null,
        DeadLineQueryFunc: null,
        dueToTime: '2020.12.12 12:12'
    },
    didMount() {

        const {location, routes, dueToStr, dueToTime, dueTo} = this.props
        if (location && routes) {
            let finds = routes.findIndex(item => item.component == location)
            let redirect = this.props.routes.filter(v => v.redirect !== undefined)
            this.setData({
                location,
                redirect,
                dueTo,
                dueToTime,
                dueToStr,
                itemSelect: finds,
                titleName: routes[finds].name
            })
        }
        if (this.props.dueTo) {
            this.setData({
                visible2: true
            })
        }

    },
    didUpdate() {
        if (this.props.location !== this.data.location) {
            console.log(this.props.location, 'this.props.location');
            let {redirect} = this.data
            if (redirect.length > 0) {
                redirect.map(v => {
                    if (v.component == this.props.location) {
                        let finds = this.props.routes.findIndex(item => item.component == v.redirect)
                        this.setitemSelectData(finds, v.redirect)
                    }
                })
            }
        }
    },
    didUnmount() {
    },
    methods: {
        setitemSelectData(index, component) {
            this.props.onSelect && this.props.onSelect(component);
            this.setData({
                itemSelect: index,
                titleName: this.props.routes[index].name
            })
        },
        itemSelect(e) {
            let {component, index} = e.currentTarget.dataset
            this.setitemSelectData(index, component)

        },
        itemSelect(e) {
            let {redirect} = this.data
            let {component, index} = e.currentTarget.dataset
            if (redirect.length > 0) {
                redirect.map(v => {
                    if (v.component == component) {
                        let finds = this.props.routes.findIndex(item => item.component == v.redirect)
                        this.setitemSelectData(finds, v.redirect)
                    } else {
                        this.setitemSelectData(index, component)
                    }
                })
            } else {
                this.setitemSelectData(index, component)
            }
        },
        contactUs(e) {
            this.setData({
                visible: true
            })
        },
        useGuide() {
            let useGuideUrl = this.props.useGuideUrl
            my.qn.navigateToWebPage({
                url: useGuideUrl,
                success: res => {
                },
                fail: res => {
                }
            });
        },
        clearAuth() {
            my.qn.cleanToken({
                success: (res) => {
                },
                fail: (res) => {
                }
            })
        },
        dueToTime() {
            my.qn.navigateToWebPage({
                url: this.props.serviceUrl,
                success: res => {
                },
                fail: res => {
                }
            });
        },
        onClose() {
            this.setData({
                visible: false
            })
        },

        onClose2() {
            this.setData({
                visible2: false,
                visibleFlexd: true
            })
        },
        openIM() {
            my.qn.openChat({
                nick: 'cntaobaotb4777191548',
                text: '你好',
                success: (res) => {
                },
                fail: (res) => {
                }
            })
        }
    },
});
