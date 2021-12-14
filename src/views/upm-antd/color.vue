<template>
    <div id="color">
        <a-radio-group default-value="a" button-style="solid">
            <a-radio-button value="a">
                Hangzhou
            </a-radio-button>
            <a-radio-button value="b">
                Shanghai
            </a-radio-button>
            <a-radio-button value="c">
                Beijing
            </a-radio-button>
            <a-radio-button value="d">
                Chengdu
            </a-radio-button>
        </a-radio-group>
        <a-list :grid="{ gutter: 16, column: 4 }" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a-card :title="item.title">
                    Card content
                </a-card>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
export default {
    name: "color",
    data() {
        return {
            data: [
                {
                    title: 'Title 1',
                },
                {
                    title: 'Title 2',
                },
                {
                    title: 'Title 3',
                },
                {
                    title: 'Title 4',
                },
            ],
        };
    },
}
</script>

<style scoped>

</style>
