-- Core Shared Tables (Used by all modules)

-- Factories table
CREATE TABLE factories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    timezone VARCHAR(50),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Machines table (shared across all modules)
CREATE TABLE machines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    factory_id UUID REFERENCES factories(id),
    name VARCHAR(255) NOT NULL,
    machine_type VARCHAR(100),
    capacity_per_hour INTEGER,
    power_rating_kw DECIMAL(10,2),
    installation_date DATE,
    status VARCHAR(20) DEFAULT 'active',
    availability_schedule JSONB, -- Flexible schedule storage
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Operators table (shared across all modules)
CREATE TABLE operators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    factory_id UUID REFERENCES factories(id),
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    skill_level VARCHAR(50),
    hourly_rate DECIMAL(10,2),
    shift_preferences JSONB,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shifts table (shared across all modules)
CREATE TABLE shifts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    factory_id UUID REFERENCES factories(id),
    name VARCHAR(100) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    working_days INTEGER[], -- Array of weekdays (1=Monday, 7=Sunday)
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table (shared across all modules)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    standard_cycle_time_minutes DECIMAL(10,2),
    target_units_per_hour INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Production Plans (shared across all modules)
CREATE TABLE production_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    factory_id UUID REFERENCES factories(id),
    machine_id UUID REFERENCES machines(id),
    product_id UUID REFERENCES products(id),
    shift_id UUID REFERENCES shifts(id),
    planned_date DATE,
    planned_quantity INTEGER,
    operator_id UUID REFERENCES operators(id),
    status VARCHAR(20) DEFAULT 'planned',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Modular Data Entry Log (tracks all data entries across modules)
CREATE TABLE data_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_name VARCHAR(50) NOT NULL, -- 'oee', 'quality', 'cost', etc.
    entry_type VARCHAR(50) NOT NULL, -- 'downtime', 'production', 'defect', etc.
    factory_id UUID REFERENCES factories(id),
    machine_id UUID REFERENCES machines(id),
    operator_id UUID REFERENCES operators(id),
    shift_id UUID REFERENCES shifts(id),
    entry_timestamp TIMESTAMP NOT NULL,
    data_payload JSONB NOT NULL, -- Flexible data storage for module-specific fields
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_data_entries_module ON data_entries(module_name);
CREATE INDEX idx_data_entries_timestamp ON data_entries(entry_timestamp);
CREATE INDEX idx_data_entries_factory ON data_entries(factory_id);
CREATE INDEX idx_data_entries_machine ON data_entries(machine_id);
