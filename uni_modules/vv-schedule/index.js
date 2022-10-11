export async function addSchedule(data) {
	//#ifdef APP-PLUS
	const {platform} = uni.getSystemInfoSync()
	if (platform == 'android') {
		return androidSchedule(data)
	} else if (platform == 'ios') {
		return iosSchedule(data)
	}
	//#endif
}

async function androidSchedule (data) {
	const calendarURL = 'content://com.android.calendar/calendars'
	const calendarEventURL = 'content://com.android.calendar/events'
	const calendarRemiderURL = 'content://com.android.calendar/reminders'
	const CalendarContract = plus.android.import('android.provider.CalendarContract')
	const account = await createAccountData()
	const main = plus.android.runtimeMainActivity()
	const timeZone = plus.android.invoke('java.util.TimeZone', 'getDefault')
	const timeZoneId = plus.android.invoke(timeZone, 'getID')
	await checkPermission()
	let accountId = getAccount()
	if (!accountId) {
		accountId = addAccount()
	}
	if (!accountId) return
	const calendarId = insertCalendar({
		calendar_id: accountId,
		title: data.title,
		description: data.description,
		dtstart: data.dtstart,
		dtend: data.dtend,
	})
	if (!calendarId) return
	return insertReminder({event_id: calendarId})

	async function checkPermission() {
		return new Promise((resolve) => {
			plus.android.requestPermissions(['android.permission.READ_CALENDAR', 'android.permission.WRITE_CALENDAR'], ({deniedAlways, deniedPresent, granted}) => {
				if (deniedAlways.length > 0) { //权限被永久拒绝
					// 弹出提示框解释为何需要权限，引导用户打开设置页面开启
					// uni.showModal({
					// 	title: '提示',
					// 	content: '请打开日历权限',
					// 	success: ({confirm}) => {
					// 		if (!confirm) return
					// 		const intent = plus.android.newObject("android.content.Intent")
					// 		const Settings = plus.android.newObject("android.provider.Settings")
					// 		const action = plus.android.getAttribute(Settings, 'ACTION_APPLICATION_DETAILS_SETTINGS')
					// 		plus.android.invoke(intent, 'setAction', action)
					// 		const uri = plus.android.invoke('android.net.Uri', 'fromParts', 'package', main.getPackageName(), null)
					// 		plus.android.invoke(intent, 'setData', uri)
					// 		main.startActivity(intent)
					// 	}
					// })
				} else if (deniedPresent.length > 0) { //权限被临时拒绝
					uni.showToast({title: '您拒绝了日历写入权限', icon: 'none'})
				} else if (granted.length > 0) { //权限被允许
					resolve()
				}
			}, err => {
				uni.showToast({title: `申请权限错误：${err.code} ${err.message}`, icon: 'none'})
			})
		})
	}
	function createAccountData() {
		return new Promise((resolve) => {
			plus.runtime.getProperty(plus.runtime.appid, ({appid, name}) => {
				resolve({
					name,
					account_name: appid,
					account_type: CalendarContract.ACCOUNT_TYPE_LOCAL,
					display_name: name,
				})
			})
		})
	}
	function getAccount() {
		const uri = plus.android.invoke('android.net.Uri', 'parse', calendarURL)
		const userCursor = plus.android.invoke(main.getContentResolver(), "query", uri, null, null, null, null)
		while (plus.android.invoke(userCursor, 'moveToNext')) {
			const _account_name = plus.android.invoke(userCursor, 'getString', plus.android.invoke(userCursor, 'getColumnIndex', 'account_name'))
			const _account_type = plus.android.invoke(userCursor, 'getString', plus.android.invoke(userCursor, 'getColumnIndex', 'account_type'))
			const _id = plus.android.invoke(userCursor, 'getString', plus.android.invoke(userCursor, 'getColumnIndex', '_id'))
			if (_account_name == account.account_name && _account_type == account.account_type) {
				return _id
			}
		}
	}
	function addAccount() {
		const value = plus.android.newObject('android.content.ContentValues')
		plus.android.invoke(value, 'put', 'name', account.name)
		plus.android.invoke(value, 'put', 'account_name', account.account_name)
		plus.android.invoke(value, 'put', 'account_type', account.account_type)
		plus.android.invoke(value, 'put', 'calendar_displayName', account.display_name)
		plus.android.invoke(value, 'put', 'visible', 1)
		plus.android.invoke(value, 'put', 'sync_events', 1)
		plus.android.invoke(value, 'put', 'calendar_timezone', timeZoneId)
		plus.android.invoke(value, 'put', 'ownerAccount', account.account_name)
		// plus.android.invoke(value, 'put', 'canOrganizerRespond', 0)
		// plus.android.invoke(value, 'put', 'calendar_color', -9206951)
		// plus.android.invoke(value, 'put', 'calendar_access_level', 700)
		const calendarUri = plus.android.invoke('android.net.Uri', 'parse', calendarURL)
		const buildUpon = plus.android.invoke(calendarUri, "buildUpon")
		plus.android.invoke(buildUpon, "appendQueryParameter", CalendarContract.CALLER_IS_SYNCADAPTER, "true")
		plus.android.invoke(buildUpon, "appendQueryParameter", "account_name", account.account_name)
		plus.android.invoke(buildUpon, "appendQueryParameter", "account_type", account.account_type)
		const build = plus.android.invoke(buildUpon, "build")
		const newAccoutList = plus.android.invoke(main.getContentResolver(), "insert", build, value)
		const newAccout_id = plus.android.invoke(plus.android.invoke(newAccoutList, "getPathSegments"), "get", 1)
		return newAccout_id
	}
	function insertCalendar({calendar_id, title, description, dtstart, dtend}) {
		const value = plus.android.newObject('android.content.ContentValues')
		const systemInfo = uni.getSystemInfoSync()
		plus.android.invoke(value, 'put', 'calendar_id', systemInfo.brand == 'Xiaomi' ? 1 : calendar_id)
		plus.android.invoke(value, 'put', 'title', title)
		plus.android.invoke(value, 'put', 'description', description)
		plus.android.invoke(value, 'put', 'dtstart', dtstart)
		plus.android.invoke(value, 'put', 'dtend', dtend)
		plus.android.invoke(value, 'put', 'eventTimezone', timeZoneId)
		// values.put("rrule", Obj.rrule);
		plus.android.invoke(value, 'put', 'hasAlarm', 1) //是否闹钟提醒 默认提醒 因为大部分手机未实现此功能 故未实现
		const calendarEventUri = plus.android.invoke('android.net.Uri', 'parse', calendarEventURL)
		const newEvent = plus.android.invoke(main.getContentResolver(), 'insert', calendarEventUri, value)
		const id = plus.android.invoke(newEvent, 'getLastPathSegment')
		return id
	}
	function insertReminder({event_id}) {
		const value = plus.android.newObject('android.content.ContentValues')
		plus.android.invoke(value, 'put', 'event_id', event_id)
		plus.android.invoke(value, 'put', 'minutes', 5)
		plus.android.invoke(value, 'put', 'method', 1)
		const calendarRemiderUri = plus.android.invoke('android.net.Uri', 'parse', calendarRemiderURL)
		const res = plus.android.invoke(main.getContentResolver(), 'insert', calendarRemiderUri, value)
		return res
	}
}
function iosSchedule(data) {
	return new Promise((resolve) => {
		const eventStore = plus.ios.newObject('EKEventStore')
		// const hasMethod = plus.ios.invoke(eventStore, 'respondsToSelector:', plus.ios.newObject('@selector', 'requestAccessToEntityType:completion:'))
		plus.ios.invoke(eventStore, 'requestAccessToEntityType:completion:', 0, () => {
			const calendar = plus.ios.invoke(eventStore, 'defaultCalendarForNewEvents')
			if (!calendar) {
				// uni.showModal({
				// 	title: '提示',
				// 	content: '请打开日历权限',
				// 	success: ({confirm}) => {
				// 		if (!confirm) return
				// 		plus.runtime.openURL('app-settings://')
				// 	}
				// })
				return
			}
			const event = plus.ios.invoke('EKEvent', 'eventWithEventStore:', eventStore)
			// const date = plus.ios.newObject('NSDate')
			event.plusSetAttribute('title', data.title)
			// event.plusSetAttribute('location', 'location')
			event.plusSetAttribute('notes', data.description)
			const startDate = plus.ios.invoke('NSDate', 'dateWithTimeIntervalSince1970:', data.dtstart /1000)
			event.plusSetAttribute('startDate', startDate)
			const endDate = plus.ios.invoke('NSDate', 'dateWithTimeIntervalSince1970:', data.dtend /1000)
			event.plusSetAttribute('endDate', endDate)
			const alarm = plus.ios.invoke('EKAlarm', 'alarmWithRelativeOffset:', -5)
			plus.ios.invoke(event, 'addAlarm:', alarm)
			plus.ios.invoke(event, 'setCalendar:', calendar)
			const res = plus.ios.invoke(eventStore, 'saveEvent:span:error:', event, 0, null)
			if (res) {
				return resolve(res)
			}
		})
	})
}