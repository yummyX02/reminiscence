# vv-schedule
### 用法：
```
import {addSchedule} from '@/uni_modules/vv-schedule'

await addSchedule({
	title: 'vvv',
	description: 'eee',
	dtstart: new Date('2021/8/28 5:00').getTime(),
	dtend: new Date('2021/8/28 6:00').getTime(),
})
uni.showToast({title: '日程添加成功'})
```