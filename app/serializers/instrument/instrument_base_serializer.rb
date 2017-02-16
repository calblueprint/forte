class InstrumentBaseSerializer < BaseSerializer
  attributes :id,
             :name,
             :instrumentable_type,
             :instrumentable_id
end
