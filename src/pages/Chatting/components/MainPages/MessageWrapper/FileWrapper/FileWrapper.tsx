import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

export default function FileWrapper() {
  return (
    <div className='flex w-full items-center justify-center rounded-md bg-white px-3 py-2 hover:cursor-pointer hover:bg-gray-100'>
      <InsertDriveFileIcon sx={{ fontSize: '36px' }} />
      <div className='ml-4 mr-2 flex grow flex-col justify-center truncate'>
        <div className='truncate text-base font-semibold'>TaiLieuHocTap.pdf</div>
        <div className='flex items-center justify-between'>
          <div className='truncate text-sm text-textColor'>15.37 KB</div>
          <div className='truncate text-sm text-textColor'>03/11/2023</div>
        </div>
      </div>
    </div>
  )
}
