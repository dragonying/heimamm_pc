<template>
    <span class="follow">
        <el-button :type="type" :size="size" @click="spider"  plain>{{ title }}</el-button>
    </span>
</template>

<script>
import WebSocketClientManager from '@/utils/WebSocketClientManager';
import bus from '@/utils/bus';
const ws = WebSocketClientManager.getInstance();
export default {
    name: 'follow',
    props: {
        items: {
            required: true
        },
        cmd: {
            type: String,
            required: true,
            default: ''
        },
        size: {
            type: String,
            required: false,
            default: 'large'
        },
        title: {
            type: String,
            required: true,
            default: ''
        },
        type: {
            required: false,
        }
    },
    data() {
        return {}
    },
    methods: {
        spider() {
            bus.$emit('openLog');
            this.$nextTick(() => {
                ws.sendMessage({ cmd: this.cmd, content: this.items });
            })
        }
    }
}
</script>
<style lang="less" scoped>
.follow {
    margin-left: 10px;
}
</style>