-- OEE Module Specific Tables

-- Downtime Categories (OEE specific)
CREATE TABLE oee_downtime_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    category_type VARCHAR(50), -- 'mechanical', 'electrical', 'administrative', etc.
    tpm_loss_type VARCHAR(50), -- TPM classification
    is_planned BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Downtime Entries (extends data_entries for OEE)
CREATE TABLE oee_downtime_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data_entry_id UUID REFERENCES data_entries(id),
    downtime_category_id UUID REFERENCES oee_downtime_categories(id),
    duration_minutes INTEGER NOT NULL,
    reason TEXT,
    resolution TEXT,
    resolved_by UUID REFERENCES operators(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Production Entries (extends data_entries for OEE)
CREATE TABLE oee_production_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data_entry_id UUID REFERENCES data_entries(id),
    product_id UUID REFERENCES products(id),
    planned_quantity INTEGER,
    actual_quantity INTEGER,
    good_quantity INTEGER,
    defect_quantity INTEGER,
    hour_of_shift INTEGER, -- 1-8 for 8-hour shift
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OEE Calculations (computed and stored for performance)
CREATE TABLE oee_calculations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    factory_id UUID REFERENCES factories(id),
    machine_id UUID REFERENCES machines(id),
    calculation_date DATE,
    shift_id UUID REFERENCES shifts(id),
    planned_production_time_minutes INTEGER,
    actual_production_time_minutes INTEGER,
    downtime_minutes INTEGER,
    total_units_produced INTEGER,
    good_units_produced INTEGER,
    availability_percentage DECIMAL(5,2),
    performance_percentage DECIMAL(5,2),
    quality_percentage DECIMAL(5,2),
    oee_percentage DECIMAL(5,2),
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default downtime categories
INSERT INTO oee_downtime_categories (name, category_type, tpm_loss_type, is_planned) VALUES
('Equipment Breakdown', 'mechanical', 'breakdown_losses', false),
('Setup & Adjustment', 'administrative', 'setup_adjustment_losses', true),
('Minor Stoppages', 'mechanical', 'minor_stoppage_losses', false),
('Reduced Speed', 'mechanical', 'reduced_speed_losses', false),
('Startup Losses', 'administrative', 'startup_losses', true),
('Quality Defects', 'quality', 'quality_losses', false);
