<template>
    <div class="followPan">
        <el-drawer title="用户粉丝和关注列表" :visible.sync="showDialog" direction="ltr" size="90%">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="粉丝" name="follower">
                    <followTabItem ref="follower" type="follower" />
                </el-tab-pane>
                <el-tab-pane label="关注" name="following">
                    <followTabItem ref="following" type="following" />
                </el-tab-pane>
            </el-tabs>
        </el-drawer>
    </div>
    <!-- <el-dialog title="用户粉丝和关注列表" width='90%' center :visible.sync="showDialog" append-to-body>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="粉丝" name="follower">
                <followTabItem ref="follower" type="follower"/>
            </el-tab-pane>
            <el-tab-pane label="关注" name="following">
                <followTabItem ref="following" type="following" />
            </el-tab-pane>
        </el-tabs>
    </el-dialog> -->
</template>

<script>
import followTabItem from '@/views/index/users/followTabItem'
export default {
    name: 'followTab',
    components: {
        followTabItem
    },
    props: {
        user: {
            required: false,
            default: null
        }
    },
    data() {
        return {
            showDialog: false,
            activeName: 'follower'
        }
    },
    watch: {
        showDialog(v) {
            if (v) {
                this.$nextTick(() => {
                    this.$refs.follower?.search(this.user);
                    this.$refs.following?.search(this.user);
                })
            }
        }
    },
    methods: {
        handleClick(tab, event) {
        }
    },
    created() {
    }
}
</script>
<style lang="less" scoped>
.followPan {
   ::v-deep .el-drawer__body {
        overflow: auto;
        padding: 0 10px;
    }
}
</style>