class Api::InstrumentsController < Api::BaseController
  def index
    instruments = Instrument.all
    render json: instruments
  end

  def create
    instrument = Instrument.new instrument_params
    if instrument.save
      render json: instrument
    else
      unprocessable_response instrument
    end
  end

  def update
    instrument = Instrument.find params[:id]
    if instrument.update_attributes instrument_params
      render json: instrument
    else
      unprocessable_response instrument
    end
  end

  def destroy
    instrument = Instrument.find params[:id]
    if instrument.destroy
      render json: instrument
    else
      unprocessable_response instrument
    end
  end

  def show
    instrument = Instrument.find params[:id]
    render json: instrument
  end

  def instrument_params
    params.require(:instrument).permit(
      :name,
      :years_played,
      :experience_level,
      :is_primary,
      :instrumentable_id,
      :instrumentable_type,
    )
  end
end
