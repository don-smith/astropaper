import applescript from 'applescript'

export default {

  getResolution () {
    let resolution = []
    let script = 'set command to "/usr/sbin/system_profiler SPDisplaysDataType | grep Resolution"\n' +
      'set output to words of (do shell script command)\n' +
      'set {dspwidth, dspheight} to {item 2, item 4} of output'

    applescript.execString(script, function (err, result) {
      if (err) return console.error(err)
      resolution = result
    })

    return resolution
  }

}
