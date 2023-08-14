import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { UserNav } from './components/user-nav'

import tasks from './data/tasks.json'

export default function TaskPage() {
	return (
		<>
			<div className='md:hidden'>
				<img
					src='/examples/tasks-light.png'
					alt='Playground'
					className='block dark:hidden w-[1280px] h-[998px]'
				/>
				<img
					src='/examples/tasks-dark.png'
					alt='Playground'
					className='hidden dark:block w-[1280px] h-[998px]'
				/>
			</div>
			<div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
				<div className='flex items-center justify-between space-y-2'>
					<div>
						<h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
						<p className='text-muted-foreground'>
							Here&apos;s a list of your tasks for this month!
						</p>
					</div>
					<div className='flex items-center space-x-2'>
						<UserNav />
					</div>
				</div>
				<DataTable data={tasks} columns={columns} />
			</div>
		</>
	)
}
