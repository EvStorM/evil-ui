import fmtEvent from "../_util/fmtEvent";
import cloud from "@tbmp/mp-cloud-sdk";
import dayjs from "dayjs";
import {qnSubscribeDeadLineQuery} from "../../../hooks/cloudFunc";

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
        process.env.NODE_ENV !== 'production' ?
            cloud.init({
                // env: 'online'
                env: 'test'
            }) : cloud.init({
                env: 'online'
            })
        const {location, routes} = this.props
        if (location && routes) {
            let finds = routes.findIndex(item => item.component == location)
            console.log(finds, '1111111');
            this.setData({
                itemSelect: finds,
                titleName: routes[finds].name
            })
        }
        this.getDueToTime()

    },
    didUpdate() {
    },
    didUnmount() {
    },
    methods: {
        getDueToTime() {
            cloud && qnSubscribeDeadLineQuery(cloud, ['', '']).subscribe(res => {
                let dueToTime = res.data[0].deadline
                let dueTo = dayjs(dueToTime).diff(dayjs(), 'day') <= 3 ? true : false
                let dueToStr = dayjs(dueToTime).format('YYYY年MM月DD日hh:mm:ss')
                this.setData({
                    dueToTime,
                    dueToStr,
                    dueTo
                })
                if (dueTo) {
                    this.setData({
                        visible2: true
                    })
                }
            })
        },
        itemSelect(e) {
            this.props.onSelect && this.props.onSelect(e.currentTarget.dataset.component);
            this.setData({
                itemSelect: e.currentTarget.dataset.index,
                titleName: this.props.routes[e.currentTarget.dataset.index].name
            })
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
