import { Link } from 'react-router-dom';
import KButton from '../../components/global/KButton';
import KSelect from '../../components/form/KSelect';

const ListLayout = ({ 
  children, 
  title,
  subtitle='',
  columns,
}) => {
  return (
    <div class="py-3 px-2">
      <div class="px-4 py-2 flex items-center justify-between">
        <div>
          <p class="font-bold text-xl">{title}</p>
          <p class="text-sm text-gray-300 italic">{subtitle}</p>
        </div>
        <Link to="create">
          <KButton 
            content={`Add ${title}`}
            onClick={() => {}}
            variant="success"
          />
        </Link>
      </div>
      <div class="px-4 py-2">
        <table class="w-full">
          <thead class="border-b bg-gray-50">
            <tr class="rounded-sm">
              <th class="p-4">S.N</th>
              {
                columns.map((column, index) => (
                  <th key={index} class="p-4">{column}</th>
                ))
              }
              <th class="p-4">Action</th>
            </tr>
          </thead>
          <tbody class="text-center">
            {children}
          </tbody>
        </table>
      </div>
      <div class="px-4 py-2 flex items-center justify-end gap-4">
        <KSelect 
          onChange={() => {}}
          options={[
            { value: 5, text: 5 },
            { value: 10, text: 10 },
            { value: 20, text: 20 },
          ]}
        />
        <KButton 
          content={'<'}
          onClick={() => {}}
        />
        <p>1</p>
        <KButton 
          content={'>'}
          onClick={() => {}}
        />
      </div>
    </div>
  )
}

export default ListLayout