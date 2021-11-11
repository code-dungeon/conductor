conductor = importModule('index').conductor

exit = process.exit

describe 'Conductor', ->
  Given ->
    conductor.emitter.removeAllListeners()
    process.exit = spy()

  describe 'on exit', ->
    Given ->
      @async = spy()
      @listener = =>
        setTimeout( =>
          console.log('calling async exit')
          @async()
        ,100)

      conductor.on('prepare-exit', @listener)

    When (done)->
      conductor.on('exit', done)
      @execute()

    describe 'SIGINT', ->
      Given -> @execute = () => conductor.handleSigInt()
      Then -> @async.should.have.been.called

    describe 'SIGTERM', ->
      Given -> @execute = () => conductor.handleSigTerm()
      Then -> @async.should.have.been.called

    describe 'uncaughtException', ->
      Given -> @execute = () => conductor.handleUncaughtException(new Error('something bad happened'))
      Then -> @async.should.have.been.called

  describe '#setLogCreate', ->
    Given ->
      @logger = {
        debug: spy(),
        info: spy(),
        warn: spy(),
        error: spy(),
        fatal: spy()
      }

    When -> conductor.setLogCreate(() =>
      @logger
    )

    When -> conductor.exit()
    Then -> @logger.debug.should.have.been.called

  after ->
    process.exit = exit
