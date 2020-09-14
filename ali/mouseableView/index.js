Component({
    mixins: [],
    data: {
        isPC: false,
        x: 0,
        y: 0,
        indexData: null,
    },
    props: {},
    didMount() {
        this.actFinall = {x: this.data.x, y: this.data.y};
    },
    didUpdate() {
    },
    didUnmount() {
    },
    methods: {
        common(e) {
            this.setData({
                indexData: JSON.stringify(e)
            })
            // console.log('mouse event', e.type);
        },
        common2(e) {
            this.setData({
                indexData: JSON.stringify(e)
            })
            // console.log('mouse event2', e.type);
        },
        handleDown(e) {

            console.log('e:', e.type, e.detail);
            this.act = true;
            let {x, y} = e.detail;
            this.actNum = {x, y};
            this.setData({
                indexData: JSON.stringify(e)
            })
        },
        handleMouseMove(e) {
            this.setData({
                indexData: JSON.stringify(e)
            })
            if (!this.act) return;
            console.log('e:', e.type, e.detail, this.actNum);

            const {x: currentX, y: currentY} = e.detail;
            const {x, y} = this.actNum;

            this.setData({x: this.actFinall.x + currentX - x, y: this.actFinall.y + currentY - y});

            console.log(this.data);
        },
        handleMouseUp(e) {
            this.setData({
                indexData: JSON.stringify(e)
            })
            console.log('e:', e.type, e.detail);
            this.actFinall = {x: this.data.x, y: this.data.y};
            this.act = false;
        },
    },
});