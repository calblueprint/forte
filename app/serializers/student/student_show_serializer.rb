class StudentShowSerializer < StudentBaseSerializer
  has_many :instruments, serializer: InstrumentBaseSerializer
end
