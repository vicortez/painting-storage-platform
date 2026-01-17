type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pictures: any[]
  onClickPicture: (pictureId: number) => void
}

const getFormattedSize = (sizeBytes: number) => {
  if (sizeBytes < 1024) {
    return `${sizeBytes} Bytes`
  } else {
    return `${(sizeBytes / 1024).toFixed(2)} KB`
  }
}

const PictureTable = ({ pictures, onClickPicture }: Props) => {
  return (
    <div className="w-full max-w-5xl overflow-x-auto shadow-sm">
      <table className="w-full text-left border-collapse border border-gray-300 bg-white table-fixed min-w-lg">
        <thead>
          <tr className="bg-primary text-white">
            <th className="p-3 font-bold border-r border-gray-300 text-sm sm:text-base w-[31%] max-w-72">
              Foto
            </th>
            <th className="p-3 font-bold border-r border-gray-300 text-sm sm:text-base">Tamanho</th>
            <th className="p-3 font-bold border-r border-gray-300 text-sm sm:text-base">
              Data de aquisição
            </th>
            <th className="p-3 font-bold text-sm sm:text-base">Cor predominante</th>
          </tr>
        </thead>
        <tbody>
          {pictures.map((picture) => (
            <tr
              key={picture.id}
              className="border-b border-gray-300 last:border-b-0 hover:bg-gray-100 cursor-pointer"
              onClick={() => onClickPicture(picture.id)}
            >
              <td className="p-3 border-r border-gray-300 text-gray-800 font-medium">
                <span className="block truncate">{picture.fileName}</span>
              </td>
              <td className="p-3 border-r border-gray-300 text-gray-800">
                {getFormattedSize(picture.sizeBytes)}
              </td>
              <td className="p-3 border-r border-gray-300 text-gray-800">
                {picture.aquisitionDate}
              </td>
              <td className="p-3 font-semibold" style={{ color: picture.predominantColor }}>
                {picture.predominantColor}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PictureTable
