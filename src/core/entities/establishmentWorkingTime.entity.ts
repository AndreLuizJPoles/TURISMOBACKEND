export interface IEstablishmentWorkingTimeEntity {
  id: string;
  opening_time: string;
  closing_time: string;
  establishment_id: string;
  open_on_sunday: boolean;
  open_on_monday: boolean;
  open_on_tuesday: boolean;
  open_on_wednesday: boolean;
  open_on_thursday: boolean;
  open_on_friday: boolean;
  created_at: Date;
  updated_at: Date;
}
