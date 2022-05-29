import Window from '../ui/Window'

const About = () => {
  const version = process.env.REACT_APP_VERSION
  const buildDate = process.env.REACT_APP_BUILD_DATE
  return (
    <Window
      id='about-window'
      title='About'
      statusItems={[
        `Version: ${version}`,
        `Build date: ${buildDate}`,
        `License: GNU AGPLv3`,
      ]}
    >
      <div className='field-row-stacked'>
        <span>
          <a href='https://sampo.website' target='_blank'>
            Sampo Rapeli's
          </a> solution to&nbsp;
          <a href='https://koodihaaste.solidabis.com/' target='_blank'>
            Solidabis' code challenge 2022
          </a>
          .
        </span>
        <span>
          Source code:&nbsp;
          <a href='https://github.com/samporapeli/solidabis-koodihaaste22' target='_blank'>
            github.com/samporapeli/solidabis-koodihaaste22
          </a>
        </span>
      </div>
    </Window>
  )
}

export default About
