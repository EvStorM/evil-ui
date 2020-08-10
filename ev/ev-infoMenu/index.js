import fmtEvent from "../_util/fmtEvent";


Component({
    mixins: [],
    data: {
        itemSelect: 0,
        visible: false,
        visible2: false,
        visibleFlexd: false
    },
    props: {
        location: '',
        titleName: '首页',
        onSelect: null,
        routes: null,
        dueTo: false,
        serviceUrl: null,
        dueToTime: '2020.12.12 12:12'
    },
    didMount() {
        const {location, routes} = this.props
        if (location && routes) {
            let finds = routes.findIndex(item => item.component == location)
            console.log(finds, '1111111');
            this.setData({
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
    },
    didUnmount() {

    },
    methods: {
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
