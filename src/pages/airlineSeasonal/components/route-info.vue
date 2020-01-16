<template>
    <!-- 航线覆盖情况 -->
    <div class="model-item" >
        <boxDecorate></boxDecorate>
         <div class="model-title flex flex-yc flex-between">
            {{data[type].title}}
              <div class="flex flex-yc flex-between sub-title">
                <p>首航国内</p>
                <p>首航国际</p>
            </div>
        </div>
        <div class="model-body route-info ">
            <div class="text"><span>国内 :</span><p>{{data[type].in}}</p></div>
            <div class="text"><span>国际 :</span><p>{{data[type].out}}</p></div>
        </div>
    </div>
</template>
<script>
import boxDecorate from "./box-decorate";

export default {
    props: {
        type: {
            type: String,
            default:0
        }
    },
        data() {
            return {
                data:{
                    '0':{
                        title:'春运热门航线',
                        in:'沈阳-海口、天津-丽江、杭州-三亚、长春-海口、宁波-海口、南京-桂林、西安-海口、天津-三亚、成都-三亚',
                        out:'北京-马尔代夫、杭州-大阪、青岛-墨尔本、青岛-悉尼'
                    },
                     '1':{
                        title:'春运加密航线',
                        in:'临沂-三亚、南京-三亚，天津-丽江、南宁-丽江，杭州-丽江、三亚-南宁，杭州-海口、丽江-合肥',
                        out:'杭州=静冈、杭州=大阪、杭州=塞班'
                    }
                }
            }
        },
    components: {
        boxDecorate,
    }
};
</script>

