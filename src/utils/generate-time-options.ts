const generateTimeOptions = () => {
  const options: { label: string; value: string }[] = []

  for (let hour = 9; hour <= 20; hour++) {
    for (const minute of [0, 30]) {
      const label = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      options.push({ label, value: label })
    }
  }

  return options
}

export const timeOptions = generateTimeOptions()
