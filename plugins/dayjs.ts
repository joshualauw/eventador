import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

export default defineNuxtPlugin(() => {
    dayjs.extend(duration);
    dayjs.extend(relativeTime);
    dayjs.extend(isSameOrBefore);
});
