import { useMemo } from 'react'
import { useBuilderStore } from '../../store/useBuilderStore'


type GroupMap = Record<string, string[]>

const EXCLUSIVE_GROUPS: GroupMap = {
  'Font Size': ['text-sm','text-base','text-lg','text-xl','text-2xl','text-3xl','text-4xl'],
  'Font Weight': ['font-normal','font-medium','font-semibold','font-bold','font-extrabold'],
  'Text Color': ['text-white','text-gray-900','text-gray-500','text-red-500','text-blue-500','text-green-500','text-yellow-500','text-purple-500'],
  Background: ['bg-white','bg-gray-100','bg-gray-900','bg-blue-500','bg-red-500','bg-green-500','bg-yellow-400','bg-purple-500'],
  Rounded: ['rounded-none','rounded','rounded-md','rounded-lg','rounded-xl','rounded-2xl','rounded-full'],
  Shadow: ['shadow-none','shadow-sm','shadow','shadow-md','shadow-lg','shadow-xl'],
  Width: ['w-full','w-auto','w-1/2','w-1/3','w-1/4','w-64','w-48','w-32'],
  Height: ['h-auto','h-full','h-8','h-12','h-16','h-24','h-32','h-48'],
  Opacity: ['opacity-25','opacity-50','opacity-75','opacity-100'],
  Cursor: ['cursor-pointer','cursor-default','cursor-not-allowed'],
  Overflow: ['overflow-hidden','overflow-auto','overflow-scroll','overflow-visible'],
}

const ADDITIVE_GROUPS: GroupMap = {
  Padding: ['p-1','p-2','p-4','p-6','p-8','px-4','py-2','px-6','py-3'],
  Margin: ['m-0','m-2','m-4','mx-auto','mt-4','mb-4'],
  Border: ['border','border-2','border-4','border-gray-300','border-blue-500','border-red-500'],
  Layout: ['flex','flex-row','flex-col','flex-wrap','items-center','items-start','justify-center','justify-between','justify-start','gap-2','gap-4','gap-6'],
  Animation: ['animate-spin','animate-ping','animate-pulse','animate-bounce'],
}

const ALL_GROUPS: GroupMap = { ...EXCLUSIVE_GROUPS, ...ADDITIVE_GROUPS }

export default function PropertyPanel() {
  const el = useBuilderStore(s => s.getSelected())
  const update = useBuilderStore(s => s.updateElement)
  const remove = useBuilderStore(s => s.removeElement)

  if (!el) return <div>Select element</div>

  const classList = useMemo<string[]>(
    () => (el.props.className ?? '').split(' ').filter(Boolean),
    [el.props.className]
  )

  const hasClass = (cls: string): boolean =>
    classList.includes(cls)

  const toggleClass = (cls: string, group: string) => {
    const isExclusive = group in EXCLUSIVE_GROUPS
    const groupItems = EXCLUSIVE_GROUPS[group] ?? []

    let next: string[]

    if (isExclusive) {
      const filtered = classList.filter((c: string) => !groupItems.includes(c))
      next = hasClass(cls) ? filtered : [...filtered, cls]
    } else {
      next = hasClass(cls)
        ? classList.filter((c: string) => c !== cls)
        : [...classList, cls]
    }

    update(el.id, { className: next.join(' ') })
  }


  return (
    <div>
      {Object.entries(ALL_GROUPS).map(([label, chips]) => (
        <div key={label}>
          {chips.map((chip: string) => (
            <button key={chip} onClick={() => toggleClass(chip, label)}>
              {chip}
            </button>
          ))}
        </div>
      ))}

      <button onClick={() => remove(el.id)}>Delete</button>
    </div>
  )
}